import { Injectable } from '@angular/core';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
@Injectable({
  providedIn: 'root'
})
export class GtmDispatchEventsService implements GtmDispatchEventsRepository {
  constructor() { }

  /**
   * Envía un evento a través de la capa de GTM.
   * @param event - El evento que se va a enviar.
   */
  sendEvent(event: any): void {
    let customEvent = new CustomEvent('gtmEvent', { detail: event });
    document.dispatchEvent(customEvent);
  }

}
