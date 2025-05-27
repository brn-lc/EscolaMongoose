import { Request, Response } from "express";
import { Disciplina } from "../models";
class DisciplinaController {
  public async create(req: Request, res: Response): Promise<void> {
    const { descricao } = req.body;
    try {
      const document = new Disciplina({ descricao });
      const resp = await document.save();
      res.json(resp); // Sem 'return'
    } catch (error: any) {
      if (error && error.errors["descricao"]) {
        res.json({ message: error.errors["descricao"].message });
      } else {
        res.json({ message: error.message });
      }
    }
  }
  public async list(_: Request, res: Response): Promise<void> {
    try {
      const objects = await Disciplina.find().sort({ descricao: "asc" });
      res.json(objects);
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  public async delete(req: Request, res: Response): Promise<void> {
    const { id: _id } = req.body; // _id do registro a ser excluído
    try {
      const object = await Disciplina.findByIdAndDelete(_id);
      if (object) {
        res.json({ message: "Disciplina excluída com sucesso" });
      } else {
        res.json({ message: "Disciplina inexistente" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  public async update(req: Request, res: Response): Promise<void> {
    const { id, descricao } = req.body;
    try {
      const document = await Disciplina.findById(id);

      // Verifica se o documento existe
      if (!document) {
        res.json({ message: "Disciplina inexistente" });
        return; // Interrompe a execução aqui
      }

      // Atualiza e salva
      document.descricao = descricao;
      const resp = await document.save();
      res.json(resp);
    } catch (error: any) {
      if (error && error.errors["descricao"]) {
        res.json({ message: error.errors["descricao"].message });
      } else {
        res.json({ message: error.message });
      }
    }
  }
}
export default new DisciplinaController();
