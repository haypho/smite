import { NextApiRequest, NextApiResponse } from "next";
import { SmiteGod } from "../../../models";
import { SmiteGodsService } from "../../../services/smite/smiteGods.service";

export default async function handler(_: NextApiRequest, res: NextApiResponse<SmiteGod[]>) {
  try {
    const smiteGods = await SmiteGodsService.getGods();
    res.status(200).json(smiteGods);
  } catch (error) {
    res.status(500).send(error);
  }
}