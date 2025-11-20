// controllers/company.controller.js

import { CompanyModel } from "../model/company.model.js";

/**
 * Controlador Company
 * Contiene la lógica de negocio del CRUD de empresas.
 */

export const createCompany = async (req, res) => {
  try {
    const id = await CompanyModel.create(req.body);

    res.status(201).json({
      message: "Empresa creada correctamente",
      company_id: id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la empresa", details: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las empresas" });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await CompanyModel.findById(req.params.id);

    if (!company) return res.status(404).json({ error: "Empresa no encontrada" });

    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la empresa" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const exists = await CompanyModel.findById(req.params.id);

    if (!exists) return res.status(404).json({ error: "Empresa no existe" });

    await CompanyModel.update(req.params.id, req.body);

    res.json({ message: "Empresa actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar empresa" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    await CompanyModel.delete(req.params.id);
    res.json({ message: "Empresa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar empresa" });
  }
};
