export const fetchAllReservasFromDB = async () => {
    try {
        const res = await fetch("/api/reserva");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
            return data;
        } else {
            console.error("Dados inválidos recebidos da API");
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        return [];
    }
};

export const fetchReservasPendentesFromDB = async () => {
    try {
        const res = await fetch("/api/reserva?status=0");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
            return data;
        } else {
            console.error("Dados inválidos recebidos da API");
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        return [];
    }
}

export const fetchReservasAprovadasFromDB = async () => {
    try {
        const res = await fetch("/api/reserva?status=1");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
            return data;
        } else {
            console.error("Dados inválidos recebidos da API");
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        return [];
    }
}

export const fetchReservasCanceladasFromDB = async () => {
    try {
        const res = await fetch("/api/reserva?status=2");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
            return data;
        } else {
            console.error("Dados inválidos recebidos da API");
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        return [];
    }
}