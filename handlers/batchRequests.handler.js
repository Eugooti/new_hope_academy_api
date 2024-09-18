const axios = require('axios');

const batchRequestsHandler = async (req, res) => {
    const requests = req.body.requests;

    if (!Array.isArray(requests) || requests.length === 0) {
        return res.status(400).json({ error: 'Invalid request format or empty batch' });
    }

    const responses = [];


    for (const request of requests) {
        const { method, url, data, headers } = request;

        // Validate HTTP method
        if (!['get', 'post', 'put', 'delete'].includes(method.toLowerCase())) {
            responses.push({
                status: 400,
                data: { message: `Invalid HTTP method: ${method}` }
            });
            continue;
        }

        try {
            const response = await axios({
                method: method.toLowerCase(),
                url: `http://localhost:4600/nha${url}`, // Append baseURL
                data,
                headers,  // Pass the client headers to each individual request
            });

            responses.push({ status: response.status, data: response.data });
        } catch (error) {
            responses.push({
                status: error.response ? error.response.status : 500,
                data: error.response ? error.response.data : { message: error.message }
            });
        }
    }

    res.json({ responses });
};

module.exports = { batchRequestsHandler };
