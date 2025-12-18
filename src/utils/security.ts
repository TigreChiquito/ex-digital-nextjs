/**
 * Utilidades de seguridad para sanitización de datos
 */

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param text - Texto a escapar
 * @returns Texto escapado de forma segura
 */
export function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Sanitiza input de usuario removiendo scripts potencialmente peligrosos
 * @param input - String de entrada
 * @returns String sanitizado
 */
export function sanitizeInput(input: string): string {
    // Remover tags de script
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remover event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Remover javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');
    
    return sanitized.trim();
}

/**
 * Valida formato de email
 * @param email - Email a validar
 * @returns true si es válido
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida formato de RUT chileno
 * @param rut - RUT a validar
 * @returns true si es válido
 */
export function isValidRUT(rut: string): boolean {
    // Remover puntos y guión
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
    
    if (cleanRut.length < 2) return false;
    
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();
    
    // Validar que el cuerpo sean solo números
    if (!/^\d+$/.test(body)) return false;
    
    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;
    
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const expectedDV = 11 - (sum % 11);
    const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();
    
    return dv === calculatedDV;
}

/**
 * Valida longitud de contraseña
 * @param password - Contraseña a validar
 * @param minLength - Longitud mínima (default: 8)
 * @returns true si cumple requisitos
 */
export function isValidPassword(password: string, minLength: number = 8): boolean {
    return password.length >= minLength;
}

/**
 * Valida fortaleza de contraseña
 * @param password - Contraseña a validar
 * @returns Objeto con nivel de fortaleza y sugerencias
 */
export function checkPasswordStrength(password: string): {
    level: 'weak' | 'medium' | 'strong';
    score: number;
    suggestions: string[];
} {
    let score = 0;
    const suggestions: string[] = [];
    
    // Longitud
    if (password.length >= 8) score++;
    else suggestions.push('Usa al menos 8 caracteres');
    
    if (password.length >= 12) score++;
    
    // Tiene mayúsculas
    if (/[A-Z]/.test(password)) score++;
    else suggestions.push('Incluye al menos una mayúscula');
    
    // Tiene minúsculas
    if (/[a-z]/.test(password)) score++;
    else suggestions.push('Incluye al menos una minúscula');
    
    // Tiene números
    if (/\d/.test(password)) score++;
    else suggestions.push('Incluye al menos un número');
    
    // Tiene caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else suggestions.push('Incluye al menos un carácter especial (!@#$%^&*)');
    
    let level: 'weak' | 'medium' | 'strong';
    if (score <= 2) level = 'weak';
    else if (score <= 4) level = 'medium';
    else level = 'strong';
    
    return { level, score, suggestions };
}

/**
 * Limita la longitud de un string de forma segura
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado
 */
export function truncateString(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Sanitiza nombre de archivo
 * @param filename - Nombre del archivo
 * @returns Nombre sanitizado
 */
export function sanitizeFilename(filename: string): string {
    // Remover caracteres peligrosos
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/\.{2,}/g, '.')
        .substring(0, 255); // Límite de longitud
}
