const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ethree API',
            version: '1.0.0',
            description: 'API for Ethree - Eat, Enjoy, Entertainment platform (Mock DB Version)',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mock DB Initializer log
const mongoose = require('mongoose');

// Database Connection (Cached for Serverless)
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log('Using Cached MongoDB Connection');
        return cached.conn;
    }

    if (!cached.promise) {
        const os = require('os');
        const HOSTNAME = os.hostname();
        const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-EFOUR:52sxxM83PIPKobvk@efour.ojwn6t6.mongodb.net/?retryWrites=true&w=majority";

        console.log(`[DB] Connecting to MongoDB... (Host: ${HOSTNAME})`);

        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('[DB] New MongoDB Connection Established');
            return mongoose;
        }).catch(err => {
            console.error('[DB] MongoDB Connection Failed:', err);
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Ensure DB is connected for every request in serverless environment
app.use(async (req, res, next) => {
    // Skip DB connection for static files or simple health checks if needed
    if (req.path === '/' || req.path === '/favicon.ico') return next();

    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database Connection Middleware Error:', error);
        res.status(500).json({ error: 'Database Connection Failed', details: error.message });
    }
});

// Root Route
app.get('/', (req, res) => {
    res.send('Ethree Mock API is running. Check /api-docs for documentation.');
});

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bookings', bookingRoutes);

const loyaltyRoutes = require('./routes/loyalty');
app.use('/api/loyalty', loyaltyRoutes);

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

const rateRoutes = require('./routes/rates');
app.use('/api/rates', rateRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}

module.exports = app;
