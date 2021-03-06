module.exports = {
	dataServiceUrl : 'http://localhost:4730',
	analyticsServiceUrl : 'https://analytics.cloudboost.io',
	cacheAppPrefix : 'app',
    cacheSchemaPrefix : 'schema',
    globalDb : "_GLOBAL",
    globalSettings : "_Settings",
	schemaExpirationTimeFromCache : 86400,
    mandrill : process.env['MANDRILL'],
    mixpanelToken : process.env['MIXPANEL_TOKEN'],
	mailchimpApiKey : process.env['MAILCHIMP_API_KEY'],
	logToken : process.env['LOG_TOKEN'],
	mailGunApiKey: process.env['MAILGUN_API_KEY'],
	mailGunDomain: process.env['MAIL_GUN_DOMAIN'],
	adminEmailAddress: process.env['ADMIN_EMAIL'],
	herokuUsername : process.env['HEROKU_USERNAME'],
	herokuPassword : process.env['HEROKU_PASSWORD'],
	herokuSalt : process.env['HEROKU_SALT']
};