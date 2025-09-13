// По умолчанию в .env все значения - строки, и иногда нужно преобразовать строку в булево значение
// Эта функция принимает строку и возвращает булево значение
// Если строка не может быть преобразована, выбрасывается ошибка
// Примеры: SESSION_HTTP_ONLY

export function parseBoolean(value: string): boolean {
    if (typeof value === 'boolean') {
        return value
    }

    if (typeof value === 'string') {
        const lowerValue = value.trim().toLowerCase()
        if (lowerValue === 'true') {
            return true
        }
        if (lowerValue === 'false') {
            return false
        }
    }

    throw new Error(
        `Не удалось преобразовать значение "${value}" в логическое значение.`
    )
}
