import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from 'lucide-react';

interface DownloadPopupProps {
  companies: string[];
  onDownload: (selectedCompanies: string[]) => void;
  onClose: () => void;
  loading: boolean;
}

export function DownloadPopup({ companies, onDownload, onClose, loading }: DownloadPopupProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleCheckboxChange = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const handleDownload = () => {
    onDownload(selectedCompanies);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#244855]">Select Companies</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <ScrollArea className="h-[300px] pr-4">
          {companies.map((company) => (
            <div key={company} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={company}
                checked={selectedCompanies.includes(company)}
                onCheckedChange={() => handleCheckboxChange(company)}
              />
              <label htmlFor={company} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {company}
              </label>
            </div>
          ))}
        </ScrollArea>
        <Button
          onClick={handleDownload}
          disabled={selectedCompanies.length === 0 || loading}
          className="w-full mt-4 bg-[#E64833] hover:bg-[#C93C2B] text-white"
        >
          {loading ? 'Generating PDF...' : 'Download Selected'}
        </Button>
      </div>
    </div>
  );
}

