import { handleApiKeyAuth } from '$middleware/api-keys-auth';
import { events  as eventsDB} from '$db/events';
import { competitions as competitionsDB } from '$db/competitions';

const  AAL_Multiplier = 1000000

function prepareEvent(event) {

    event.competitions = event.competitions.map((comp) => {
        return comp.id * AAL_Multiplier
    })
    event.association = "AAL"
    event.fpa_id = event.id * AAL_Multiplier
    delete event.id
    event.dateBegin = new Date(+event.dateBegin )
    event.dateEnd = new Date(+event.dateEnd)
    event.legacy = false

    return event
}

function prepareCompetition(comp, event_id, event_name) {
    comp.id = comp.id * AAL_Multiplier
    comp.id = comp.id.toString()
    comp.event_id = event_id.toString()
    comp.event_name = event_name
    comp.results = []
    comp.startlist = []

    return comp
}

export async function POST({request}) {
    
      // Apply the API key authentication middleware
  const authResult = await handleApiKeyAuth(request);
  if (authResult) {
    return new Response(authResult.body, { status: authResult.status });
  }

    const event = await request.json()
    

    const competitions = JSON.parse(JSON.stringify(event.competitions))
    const eventObj = prepareEvent(event)
    

    for (const comp of competitions) {
        prepareCompetition(comp, eventObj.fpa_id, eventObj.name)
    }

    console.log(competitions[0]) 




    eventsDB.updateOne({"fpa_id": eventObj.fpa_id},{$set: eventObj}, {upsert: true})
    for (const comp of competitions) {
        competitionsDB.updateOne({"id": comp.id},{$set: comp}, {upsert: true})
    }

    
  

    return new Response('Successfully inserted or updated competition', { status: 200 });
}
