using Microsoft.CodeAnalysis;
using TalentNetwork.DTO;
using Microsoft.AspNetCore.StaticFiles;

namespace TalentNetwork.BACK
{
    public class FilesManager
    {
        public string Path { get; private set; }

        public FilesManager(string path)
        {
            Path = path;
        }

        public void SaveFile(IFormFile file)
        {
            var fullPath = Path + "\\" + file.FileName;
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
        }

        public void DeleteFile(string fileName)
        {
            var fullPath = Path + "\\" + fileName;
            if (File.Exists(fullPath))
                File.Delete(fullPath);
            else
                throw new Exception("File not found.");
        }

        public HttpFile GetHttpFile(string fileName)
        {
            var fullPath = Path + "\\" + fileName;
            if (File.Exists(fullPath))
            {
                var fileContent = File.ReadAllBytes(fullPath);
                return new HttpFile(fileContent, fileName);
            }
            else
            {
                throw new Exception("File not found.");
            }
        }

        public bool Exists(string fileName)
        {
            return File.Exists(Path + "\\" + fileName);
        }

        public string GetImageString(string fileName, byte[] fileBytes)
        {
            string mimeType = MimeMapping.MimeUtility.GetMimeMapping(fileName);            //Convert byte array to base64string
            string fileData_Base64 = Convert.ToBase64String(fileBytes);
            return $"data:{mimeType};base64,{fileData_Base64}";
        }
    }
}