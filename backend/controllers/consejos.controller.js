const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getConsejo = async (req, res) => {
  try {
    const { categoria, pregunta } = req.body;

    let prompt;

    if (pregunta && pregunta.trim() !== '') {
      prompt = `Un estudiante me dice: "${pregunta}". Dame un consejo útil, práctico y motivador basado en su situación. Máximo 4 oraciones.`;
    } else {
      const categorias = {
        productividad: 'productividad y eficiencia al realizar tareas y estudiar',
        salud: 'salud física y mental para estudiantes universitarios',
        estudio: 'técnicas de estudio y aprendizaje efectivo',
        motivacion: 'motivación y manejo del estrés académico'
      };
      const tema = categorias[categoria] || categorias.productividad;
      prompt = `Dame un consejo útil y práctico sobre ${tema}. El consejo debe ser concreto, de no más de 4 oraciones, y aplicable inmediatamente.`;
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente de bienestar y productividad para estudiantes. Responde siempre en español. Sé breve, práctico y motivador.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200
    });

    const consejo = completion.choices[0].message.content;
    res.json({ consejo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener consejo' });
  }
};

module.exports = { getConsejo };