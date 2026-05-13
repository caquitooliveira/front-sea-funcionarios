const API_URL = 'http://localhost:3001/employees';

export const getEmployees = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createEmployee = async (employee: unknown) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });

    return response.json();
};

export const updateEmployee = async (
    id: string,
    employee: unknown
) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });

    return response.json();
};

export const deleteEmployee = async (id: string) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};