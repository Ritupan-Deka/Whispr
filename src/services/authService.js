import { 
    signInAnonymously, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';
import { 
    ref, 
    set, 
    update, 
    onValue, 
    onDisconnect, 
    get, 
    serverTimestamp 
} from 'firebase/database';
import { auth, db } from '../config/firebase.js';
import { generateUserAvatar } from '../utils/sanitizer.js';

const googleProvider = new GoogleAuthProvider();

export const AuthService = {
    currentUser: null,
    userProfile: null,
    presenceBound: false,

    /**
     * Subscribe to Firebase Auth state changes.
     */
    onAuthStateChanged(callback) {
        return onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.currentUser = user;
                this.userProfile = await this.fetchUserProfile(user.uid, user.displayName || user.email?.split('@')[0] || 'Guest User');
                this.bindPresence(user.uid, this.userProfile.name);
                callback(user, this.userProfile);
            } else {
                this.unbindPresence();
                this.currentUser = null;
                this.userProfile = null;
                callback(null, null);
            }
        });
    },

    /**
     * Register a new user with email, password, and display name.
     */
    async register(email, password, displayName) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const avatarUrl = generateUserAvatar(displayName);

        await updateProfile(user, {
            displayName: displayName,
            photoURL: avatarUrl
        });

        const profileData = {
            uid: user.uid,
            name: displayName,
            email: email,
            status: 'Online',
            avatarUrl: avatarUrl,
            lastSeen: serverTimestamp(),
            createdAt: serverTimestamp()
        };

        await set(ref(db, `users/${user.uid}`), profileData);
        this.userProfile = profileData;
        return user;
    },

    /**
     * Sign in with existing email and password.
     */
    async login(email, password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const profile = await this.fetchUserProfile(user.uid, user.displayName || email.split('@')[0]);
        await this.updateStatus(user.uid, 'Online');
        return profile;
    },

    /**
     * Single Sign-On using Google OAuth (One-click login with Google Email).
     */
    async loginWithGoogle() {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        const avatarUrl = user.photoURL || generateUserAvatar(user.displayName || user.email);

        const profileData = {
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            status: 'Online',
            avatarUrl: avatarUrl,
            lastSeen: serverTimestamp(),
            createdAt: serverTimestamp()
        };

        await set(ref(db, `users/${user.uid}`), profileData);
        this.userProfile = profileData;
        return user;
    },

    /**
     * Guest / Anonymous sign-in with chosen display name.
     */
    async loginAsGuest(displayName) {
        const name = displayName.trim() || 'Guest_' + Math.floor(1000 + Math.random() * 9000);
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        const avatarUrl = generateUserAvatar(name);

        await updateProfile(user, {
            displayName: name,
            photoURL: avatarUrl
        });

        const profileData = {
            uid: user.uid,
            name: name,
            isGuest: true,
            status: 'Online',
            avatarUrl: avatarUrl,
            lastSeen: serverTimestamp()
        };

        await set(ref(db, `users/${user.uid}`), profileData);
        this.userProfile = profileData;
        return user;
    },

    /**
     * Send Password Reset Email.
     */
    async resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    },

    /**
     * Log out current session.
     */
    async logout() {
        if (this.currentUser) {
            await this.updateStatus(this.currentUser.uid, 'Offline');
        }
        return signOut(auth);
    },

    /**
     * Fetch user profile metadata from RTDB or set default if not present.
     */
    async fetchUserProfile(uid, defaultName = 'User') {
        const userRef = ref(db, `users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            const avatarUrl = generateUserAvatar(defaultName);
            const defaultProfile = {
                uid: uid,
                name: defaultName,
                status: 'Online',
                avatarUrl: avatarUrl,
                lastSeen: serverTimestamp()
            };
            await set(userRef, defaultProfile);
            return defaultProfile;
        }
    },

    /**
     * Update user online status ('Online', 'Offline', 'Away').
     */
    async updateStatus(uid, status) {
        if (!uid) return;
        return update(ref(db, `users/${uid}`), {
            status: status,
            lastSeen: serverTimestamp()
        });
    },

    /**
     * Bind native Firebase RTDB connected state to user presence with onDisconnect hook.
     */
    bindPresence(uid, name) {
        if (this.presenceBound) return;
        const connectedRef = ref(db, '.info/connected');
        const userRef = ref(db, `users/${uid}`);

        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                // Configure automatic offline status on disconnect/tab closure
                onDisconnect(userRef).update({
                    status: 'Offline',
                    lastSeen: serverTimestamp()
                });

                // Set online status while active
                update(userRef, {
                    name: name || 'User',
                    status: 'Online',
                    lastSeen: serverTimestamp()
                });
            }
        });

        this.presenceBound = true;
    },

    unbindPresence() {
        this.presenceBound = false;
    }
};
