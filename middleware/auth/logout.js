const logout = async (req,res) => {
// Clear the session and remove the session cookie
   await req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
       res.clearCookie('authToken');
       res.clearCookie('refreshToken');
       res.clearCookie('sessionCookie');
       return res.status(200).json({ message: 'Logged out successfully' });
    });
}

module.exports={logout}
