(function (undefined) {
	function replaceStringInObjectProperties(entity, regExp, replacement) {
		for (let property in entity) {
			if (!entity.hasOwnProperty(property)) {
				continue;
			}
			let value = entity[property];
			if (typeof value === "object") {
				value = replaceStringInObjectProperties(value, regExp, replacement);
			}
			else if (typeof value === "string") {
				value = value.replace(regExp, replacement);
			}
			entity[property] = value;
		}
		return entity;
	}

	function sentryBeforeSend(event, hint)
	{
	  let regExp = new RegExp("[a-z]+-extension\:\/\/[^\/]+\/", 'gi' );
	  event = replaceStringInObjectProperties(event, regExp, "extension://wallet/")

	  return event;
	}

	const initObject = {
		dsn: 'https://971374f2265e480f9c3262754d2cedee@catch-nimbus.bitdefender.net/145',
		beforeSend: sentryBeforeSend,
		environment: BROWSER_VALUES.ENVIRONMENT,
		release: BROWSER_VALUES.RELEASE,
		enabled: false
	};

	if (BROWSER_VALUES.ENVIRONMENT === "content") {
		initObject.defaultIntegrations = false;
	}

	Sentry.init(initObject);
})();