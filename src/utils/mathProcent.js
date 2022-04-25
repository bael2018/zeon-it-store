export const mathProcent = (previous, current) => {
    const element = previous / 100

    const result = current / +element.toFixed(0)

    return 100 - result.toFixed(0)
}