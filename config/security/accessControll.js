const roles = require('./roles');

function checkPrivilege(requiredPrivileges) {
    return (req, res, next) => {
        const { roles: userRoles } = req.user; // Extract roles array from req.user

        if (!userRoles || userRoles.length === 0) {
            return res.status(401).json({ message: 'Unauthorized: No roles provided' });
        }

        // Aggregate all privileges from the user's roles
        let aggregatedPrivileges = new Set();

        userRoles.forEach(role => {
            const rolePrivileges = roles[role] || [];
            rolePrivileges.forEach(privilege => aggregatedPrivileges.add(privilege));
        });

        // Convert Set to Array
        aggregatedPrivileges = Array.from(aggregatedPrivileges);

        // Check if any of the user's privileges match the required privileges
        const hasPrivilege = requiredPrivileges.some(privilege => aggregatedPrivileges.includes(privilege) || aggregatedPrivileges.includes('manage_all'));

        if (!hasPrivilege) {
            return res.status(403).json({ message: 'You do not have the required privileges' });
        }

        next(); // User has the required privileges, proceed
    };
}

module.exports = {checkPrivilege};
