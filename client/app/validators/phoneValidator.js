export default function validatePhone(phone) {
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
	return phoneRegex.test(phone);
};