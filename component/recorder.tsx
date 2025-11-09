import { useRef, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Image from "next/image";

export const AudioRecorder = ({ filePrefix }: { filePrefix: string }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Démarrer l'enregistrement
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await uploadToSupabase(blob);
      };

      mediaRecorder.start();
      setRecording(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Micro non accessible :", err);
      alert("Micro non accessible : veuillez vérifier les permissions.");
    }
  };

  // Arrêter l'enregistrement
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    console.log("Recording stopped");
  };

  // Upload vers Supabase Storage
  const uploadToSupabase = async (blob: Blob) => {
    const fileName = `${filePrefix}_recording_${Date.now()}.wav`;

    console.log({ fileName });

    const { error } = await supabase.storage
      .from("audio")
      .upload(fileName, blob, { contentType: "audio/wav" });

    if (error) {
      console.error("Erreur d'upload :", error);
      alert("Erreur pendant l'upload ! Contactez Elise.");
      return;
    }

    // Récupérer l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from("audio")
      .getPublicUrl(fileName);

    setAudioURL(publicUrlData.publicUrl);
    console.log("Upload terminé :", publicUrlData.publicUrl);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="text-[#cf392c] text-xl font-semibold">Votre réponse ?</h2>
      <button
        onClick={recording ? stopRecording : startRecording}
        className="p-3! opacity-90 rounded-full bg-[#cf392c] hover:bg-[#d0342c] transition"
      >
        <Image
          className="invert"
          src={recording ? "/mic-stop.svg" : "/mic.svg"}
          alt={recording ? "Stop Recording" : "Start Recording"}
          width={42}
          height={42}
        />
      </button>

      {audioURL && !recording && (
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <h4 className="text-[#cf392c] text-md font-semibold">
            Votre réponse a bien été enregistrée.
          </h4>
          <p className="text-sm text-[#3a2b21]">
            Sachez que vous pouvez enregistrer une nouvelle version en cliquant
            sur le micro.
          </p>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
};
