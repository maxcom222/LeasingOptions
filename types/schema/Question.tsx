import { Answer } from "./Answer";
import { Organization } from "./Organization";

export type Question = {
    name: string,
    author: Organization,
    answerCount: number,
    acceptedAnswer: Answer
}