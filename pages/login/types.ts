interface In18 {
    subtitle: string
    email: string
    password: string
    email_placeholder: string
    forgot_password: string
    name: string
    name_placeholder: string
    login: string
    register: string
    or: string
}

interface RegisterPayload {
    email: string
    password: string
    name: string
    firebaseId: string
}

export type {
    In18
}