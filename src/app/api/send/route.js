import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);



export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Amber <amberhasan237@gmail.com>',
      to: ['amberhasan237@gmail.com'],
      subject: 'Hello world',
      react: <>
      <p> Email Body</p>

             </>,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}