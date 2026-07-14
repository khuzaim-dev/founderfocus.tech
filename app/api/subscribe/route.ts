import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'A valid email is required.' },
        { status: 400 }
      )
    }

    // TODO: Wire to actual email provider (Mailchimp, ConvertKit, etc.)
    // Example: await mailchimp.lists.addListMember(listId, { email_address: email, status: 'subscribed' })

    console.log(`[Subscribe] New subscriber: ${name || '(no name)'} <${email}>`)

    return NextResponse.json({ message: 'Subscribed successfully.' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
