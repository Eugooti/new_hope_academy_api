const logout = async (req,res) => {
// Clear the session and remove the session cookie
   await req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }

        // Remove the session cookie
        res.clearCookie('sessionCookie');

        // Redirect or send a response indicating successful logout
        res.json({ message: 'Logout successful' });
    });
}

module.exports={logout}
