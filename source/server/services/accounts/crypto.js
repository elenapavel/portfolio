import crypto from "crypto";

// https://gist.github.com/skeggse/52672ddee97c8efec269
const settings = {
	keylen: 32,
	saltBytes: 16,
	digest: "sha512",
	// tune so it takes around 1 sec to gen hash
	iterations: 512 * 1024,
};

export default {
	verify(password, token) {
		return new Promise((resolve, reject) => {
			// ensure token is a buffer and not a string
			token = Buffer.isBuffer(token) ? token : Buffer.from(token);

			// extract the salt and hash from the token buffer
			const saltBytes = token.readUInt32BE(0);
			const keylen = token.length - saltBytes - 8;
			const iterations = token.readUInt32BE(4);
			const salt = token.slice(8, saltBytes + 8);
			const hash = token.toString("binary", saltBytes + 8);

			function onResult(error, verify) {
				if (error) reject(error);

				resolve(verify.toString("binary") === hash);
			}

			// verify the salt and hash against the password
			crypto.pbkdf2(
				password,
				salt,
				iterations,
				keylen,
				settings.digest,
				onResult
			);
		});
	},

	hash(password) {
		return new Promise((resolve, reject) => {
			// generate a salt for pbkdf2
			crypto.randomBytes(settings.saltBytes, (error, salt) => {
				if (error) reject(error);

				function onResult(error, hash) {
					if (error) reject(error);

					const token = Buffer.alloc(hash.length + salt.length + 8);

					token.writeUInt32BE(salt.length, 0, true);
					token.writeUInt32BE(settings.iterations, 4, true);

					salt.copy(token, 8);
					hash.copy(token, salt.length + 8);

					resolve(token);
				}

				crypto.pbkdf2(
					password,
					salt,
					settings.iterations,
					settings.keylen,
					settings.digest,
					onResult
				);
			});
		});
	},
};
