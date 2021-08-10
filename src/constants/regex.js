const regex = {
    phoneNumber: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    username: /^[a-z0-9_-]{5,}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/,
};

export { regex };
