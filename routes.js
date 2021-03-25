const router = require('express').Router();

// Get all the posts in the app
router.get('/test', (req, res) => {
    try {
        const data = { data: true };
        res.json(data);
    } catch (error) {
        res.json({
            error: true,
            message: `Error message: ${error}`
        });
    }
});

module.exports = router;
