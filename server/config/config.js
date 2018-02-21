var env = process.env.NODE_ENV || 'development';

if (env === 'development')
{
    process.env.PORT = 3000;
}
else if (env === 'test')
{
    process.env.PORT = 3000;
}
//else in Heroku the env variable is set to production