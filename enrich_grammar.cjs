const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/data/grammar.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enrichments = {
  'present-simple': {
    formulas: [
      { label: "Afirmativa", value: "Subject + Verb(s/es) + Object" },
      { label: "Negativa", value: "Subject + don't/doesn't + Verb(base) + Object" },
      { label: "Interrogativa", value: "Do/Does + Subject + Verb(base) + Object?" }
    ],
    examples: [
      { en: "The database stores user credentials securely.", es: "La base de datos almacena las credenciales del usuario de forma segura." },
      { en: "We don't push directly to the main branch.", es: "No hacemos push directamente a la rama main." },
      { en: "Does the API return a 200 OK status?", es: "¿La API devuelve un estado 200 OK?" }
    ],
    spellingRules: [
      { rule: 'Tercera persona singular (he, she, it): Se añade -s al verbo.', transformation: 'Run ➔ Runs / Write ➔ Writes' },
      { rule: 'Verbos terminados en -s, -sh, -ch, -x, -o: Se añade -es.', transformation: 'Push ➔ Pushes / Catch ➔ Catches / Do ➔ Does' },
      { rule: 'Verbos terminados en Consonante + -y: Cambia a -ies.', transformation: 'Verify ➔ Verifies / Modify ➔ Modifies' }
    ],
    exceptions: [
      { description: 'El verbo "Have" es irregular en la tercera persona.', incorrect: 'The server haves a memory leak.', correct: 'The server has a memory leak.' }
    ],
    additionalUses: [
      { description: 'Horarios fijos o programados (incluso en el futuro):', example: { en: 'The cron job runs at midnight.', es: 'El cron job se ejecuta a la medianoche.' } }
    ]
  },
  'past-simple': {
    formulas: [
      { label: "Afirmativa", value: "Subject + Verb(-ed / irregular) + Object" },
      { label: "Negativa", value: "Subject + didn't + Verb(base) + Object" },
      { label: "Interrogativa", value: "Did + Subject + Verb(base) + Object?" }
    ],
    examples: [
      { en: "I fixed the authentication bug yesterday.", es: "Arreglé el bug de autenticación ayer." },
      { en: "We didn't deploy the new feature last week.", es: "No desplegamos la nueva funcionalidad la semana pasada." },
      { en: "Did you review my pull request?", es: "¿Revisaste mi pull request?" }
    ],
    spellingRules: [
      { rule: 'Verbos regulares: Se añade -ed al infinitivo.', transformation: 'Deploy ➔ Deployed / Test ➔ Tested' },
      { rule: 'Verbos terminados en -e: Solo se añade -d.', transformation: 'Update ➔ Updated / Clone ➔ Cloned' },
      { rule: 'Consonante + -y: Cambia a -ied.', transformation: 'Apply ➔ Applied / Retry ➔ Retried' },
      { rule: 'CVC de una sílaba: Se duplica la consonante + ed.', transformation: 'Commit ➔ Committed / Stop ➔ Stopped' }
    ],
    exceptions: [
      { description: 'Verbos irregulares (no usan -ed): Deben memorizarse.', incorrect: 'I writed the script.', correct: 'I wrote the script.' },
      { description: 'Build también es irregular.', incorrect: 'We builded the app.', correct: 'We built the app.' }
    ]
  },
  'present-perfect': {
    formulas: [
      { label: "Afirmativa", value: "Subject + have/has + Past Participle" },
      { label: "Negativa", value: "Subject + haven't/hasn't + Past Participle" },
      { label: "Interrogativa", value: "Have/Has + Subject + Past Participle?" }
    ],
    examples: [
      { en: "I have successfully migrated the database.", es: "He migrado la base de datos con éxito." },
      { en: "She hasn't finished the QA testing yet.", es: "Ella no ha terminado las pruebas de QA todavía." },
      { en: "Have you checked the server logs?", es: "¿Has revisado los logs del servidor?" }
    ],
    exceptions: [
      { description: 'Verbos irregulares en su forma de Participio Pasado.', incorrect: 'I have wrote the tests.', correct: 'I have written the tests.' }
    ],
    additionalUses: [
      { description: 'Acciones muy recientes (usando "just"):', example: { en: 'I have just merged the branch.', es: 'Acabo de hacer merge a la rama.' } },
      { description: 'Experiencias pasadas sin especificar cuándo ocurrieron:', example: { en: 'We have used GraphQL in previous projects.', es: 'Hemos usado GraphQL en proyectos anteriores.' } }
    ]
  },
  'future-will': {
    formulas: [
      { label: "Afirmativa", value: "Subject + will + Verb(base)" },
      { label: "Negativa", value: "Subject + won't + Verb(base)" },
      { label: "Interrogativa", value: "Will + Subject + Verb(base)?" }
    ],
    examples: [
      { en: "I will fix this issue immediately.", es: "Arreglaré este problema inmediatamente." },
      { en: "The script won't take long to execute.", es: "El script no tardará mucho en ejecutarse." },
      { en: "Will the new architecture support heavy traffic?", es: "¿La nueva arquitectura soportará tráfico pesado?" }
    ],
    exceptions: [
      { description: 'Contracciones informales: En escritura muy formal técnica, evita contraer.', incorrect: "The server won't restart.", correct: 'The server will not restart.' }
    ],
    additionalUses: [
      { description: 'Decisiones espontáneas tomadas en el momento de hablar:', example: { en: 'There is a bug? Ok, I will check it.', es: '¿Hay un bug? Ok, lo revisaré.' } },
      { description: 'Promesas o compromisos (común en Dailies):', example: { en: 'I will finish the documentation by tomorrow.', es: 'Terminaré la documentación para mañana.' } }
    ]
  },
  'first-conditional': {
    formulas: [
      { label: 'Estructura principal', value: 'If + Present Simple, Subject + will + Verb(base)' },
      { label: 'Invertida', value: 'Subject + will + Verb(base) + if + Present Simple' }
    ],
    examples: [
      { en: "If the tests pass, we will deploy to production.", es: "Si las pruebas pasan, desplegaremos a producción." },
      { en: "If you don't optimize the query, the app will crash.", es: "Si no optimizas la consulta, la aplicación fallará." }
    ],
    exceptions: [
      { description: 'No usar "will" en la cláusula del "If".', incorrect: 'If the server will fail, we will reboot it.', correct: 'If the server fails, we will reboot it.' }
    ],
    additionalUses: [
      { description: 'Usar modales (can/must/should) en lugar de "will":', example: { en: 'If the token expires, you must log in again.', es: 'Si el token expira, debes iniciar sesión de nuevo.' } }
    ]
  }
};

data = data.map(topic => {
  if (enrichments[topic.id]) {
    const ext = enrichments[topic.id];
    delete topic.formula; // Remover la formula vieja
    topic.formulas = ext.formulas;
    topic.examples = ext.examples;
    if (ext.spellingRules) topic.spellingRules = ext.spellingRules;
    if (ext.exceptions) topic.exceptions = ext.exceptions;
    if (ext.additionalUses) topic.additionalUses = ext.additionalUses;
    
    // Convertir el quiz viejo si aún existe
    if (topic.checkQ) {
      topic.quizzes = [{
        question: topic.checkQ,
        options: topic.checkOpts,
        correctIndex: topic.checkOk
      }];
      delete topic.checkQ;
      delete topic.checkOpts;
      delete topic.checkOk;
    }
  }
  return topic;
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('JSON Enriquecido exitosamente.');
