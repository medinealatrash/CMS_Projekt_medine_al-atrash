module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9e96c0e5c7e6e32c6b9e92c62a543b51'),
  },
});
