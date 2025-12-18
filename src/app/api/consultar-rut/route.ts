import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const rut = searchParams.get('rut');

    if (!rut) {
        return NextResponse.json(
            { error: 'RUT no proporcionado' },
            { status: 400 }
        );
    }

    try {
        // Crear las credenciales para Basic Authentication
        const username = process.env.SIMPLE_API_USER;
        const password = process.env.SIMPLE_API_KEY;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Credenciales de API no configuradas' },
                { status: 500 }
            );
        }

        const credentials = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await fetch(`https://rut.simpleapi.cl/v2/${rut}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'RUT no encontrado' },
                { status: 404 }
            );
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error consultando RUT:', error);
        return NextResponse.json(
            { error: 'Error al consultar el RUT' },
            { status: 500 }
        );
    }
}
