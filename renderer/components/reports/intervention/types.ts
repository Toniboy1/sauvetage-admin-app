import dayjs from "dayjs"
import { IPeople } from "../../people/types"

export interface IInterventionFormData{
    id?: number
    startedAt: dayjs.Dayjs
    endedAt: dayjs.Dayjs
    date: dayjs.Dayjs,
    pilote: IPeople[]
    crew: IPeople[]
}