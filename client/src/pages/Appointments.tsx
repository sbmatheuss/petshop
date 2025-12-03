import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Calendar, Clock, Phone, PawPrint, User } from "lucide-react";

export default function Appointments() {
  const [formData, setFormData] = useState({
    tutorName: "",
    petName: "",
    phone: "",
    serviceDescription: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const createAppointment = trpc.appointments.create.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.tutorName ||
      !formData.petName ||
      !formData.phone ||
      !formData.serviceDescription ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    try {
      await createAppointment.mutateAsync({
        tutorName: formData.tutorName,
        petName: formData.petName,
        phone: formData.phone,
        serviceDescription: formData.serviceDescription,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
      });

      toast.success("Agendamento realizado com sucesso!");
      setFormData({
        tutorName: "",
        petName: "",
        phone: "",
        serviceDescription: "",
        appointmentDate: "",
        appointmentTime: "",
      });
    } catch (error) {
      toast.error("Erro ao realizar agendamento. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PawPrint className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">MUNDO PET</h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 rounded-lg p-8 shadow-2xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-2">
            Agende um atendimento
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Preencha os dados do cliente para realizar o agendamento:
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome do tutor */}
            <div>
              <Label className="text-white font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                Nome do tutor
              </Label>
              <Input
                type="text"
                name="tutorName"
                value={formData.tutorName}
                onChange={handleInputChange}
                placeholder="Helena Souza"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Nome do pet */}
            <div>
              <Label className="text-white font-semibold mb-2 flex items-center gap-2">
                <PawPrint className="w-4 h-4 text-purple-400" />
                Nome do pet
              </Label>
              <Input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                placeholder="Cheddar"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Telefone */}
            <div>
              <Label className="text-white font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400" />
                Telefone
              </Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(00) 0 0000-0000"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Descrição do serviço */}
            <div>
              <Label className="text-white font-semibold mb-2">
                Descrição do serviço
              </Label>
              <Textarea
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleInputChange}
                placeholder="Banho e tosa"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500 resize-none h-24"
              />
            </div>

            {/* Data e Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Data
                </Label>
                <Input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <Label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Hora
                </Label>
                <Input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg mt-8 transition-colors"
            >
              {isLoading ? "Agendando..." : "AGENDAR"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
