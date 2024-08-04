const crypto = require('crypto');

class IdGenerator {
    generateLearnerId(){
        return Math.floor(Math.random() *(9999 - 1000 + 1)) + 1000;
    }

    generateStaffId(){
        return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    }



    /**
     * Generates an array of unique identifiers for a book.
     * @param {number} count - Number of identifiers to generate.
     * @param {string} category - The category of the book (e.g., 'ed' for Education).
     * @param {string} subCategory - The subcategory of the book (e.g., 'sc' for Science).
     * @param {string} subject - The subject of the book (e.g., 'chem' for Chemistry).
     * @param length
     * @returns {string[]} - Array of generated book identifiers.
     */
    generateBookIdentifiers(count, category, subCategory, subject,length=6) {
        const identifiers = [];

        for (let i = 0; i < count; i++) {
            const uniqueCode = crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
            const identifier = `${category}/${subCategory}/${subject}/${uniqueCode}`;
            identifiers.push({ bookId: identifier });
        }

        return identifiers;
    }

}





module.exports = IdGenerator
