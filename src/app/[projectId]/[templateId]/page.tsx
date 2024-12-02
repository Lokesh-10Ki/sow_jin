"use client"
import { NextPage } from "next";
import { UKTemplatesData, USTemplatesData } from "@/src/constants/templates";
import { useEffect, useState } from "react";
// import PizZip from "pizzip";
// import Docxtemplater from "docxtemplater";

interface IDProp {
  params: {
    projectId: string;
    templateId: string;
  };
}

const TemplatePage: NextPage<IDProp> = ({ params }) => {
  const templateId = params.templateId;
  const projectId = params.projectId;

  const templatesData = UKTemplatesData.find(
    (template) => template.templateId === parseInt(templateId)
  );

  const [selectedTemplate, setSelectedTemplate] = useState<Blob | undefined>();

  const fetchDocument = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    setSelectedTemplate(blob);
  };


//   const generateEditableHtml = (doc) => {
//   const html = doc.renderToHtml();
//   return html.replace(/\[([\w\d]+)\]/g, (_, fieldName) => {
//     return `<input type="text" name="${fieldName}" placeholder="${fieldName}" />`;
//   });
// };

//   const parseDocx = async (blob) => {
//     const arrayBuffer = await blob.arrayBuffer();
//     const zip = new PizZip(arrayBuffer);
//     const doc = new Docxtemplater(zip);
//     return doc;
//   };

//   const generateEditableHtml = (doc) => {
//   const html = doc.renderToHtml();
//   return html.replace(/\[([\w\d]+)\]/g, (_, fieldName) => {
//     return `<input type="text" name="${fieldName}" placeholder="${fieldName}" />`;
//   });
// };


  useEffect(() => {
    if (templatesData?.templateUrl) {
      fetchDocument(templatesData.templateUrl);
    }
  }, [templatesData]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {templatesData?.templateName}
        </h2>
      </div>
      <div></div>
    </div>
  );
};

export default TemplatePage;
