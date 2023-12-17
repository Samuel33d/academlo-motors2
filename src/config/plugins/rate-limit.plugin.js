import { rateLimit } from 'express-rate-limit'

export const limitRequest = (maxRequest, windosMinutes, message) => {
    return rateLimit({
        max: maxRequest,
        windowMs: windosMinutes * 60 * 1000,
        message
    })
}