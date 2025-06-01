
const isLogin = (session) => {
    if (session && session.user) {
        // Usuário já está logado
        return { redirect: '/dashboard' };
    }
    // Usuário não está logado, pode prosseguir
    return { proceed: true };
};

const isLogout = (session) => {
    if (!session || !session.user) {
        // Usuário não está logado
        return { redirect: '/login' };
    }
    // Usuário está logado, pode prosseguir
    return { proceed: true };
};

module.exports = {
    isLogin,
    isLogout
};
