import { Input } from "@/components/ui/input";
import {
  APIProvider,
  useAutocomplete,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormPlantType } from "../page";

export default function AddressField({
  form,
  field,
}: {
  form: UseFormReturn<FormPlantType, any, undefined>;
  field: ControllerRenderProps<FormPlantType, "address">;
}) {
  const [position, setPosition] = useState({ lat: 6.155672, lng: 100.569649 });
  const [isMarkerOn, setIsMarkerOn] = useState(false);
  const zoom = 13;

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <PlaceAutoComplete
        field={field}
        form={form}
        setIsMarkerOn={setIsMarkerOn}
        setPosition={setPosition}
      />
      <div className="h-52">
        <Map zoom={zoom} center={position} disableDefaultUI>
          {isMarkerOn && <Marker position={position} />}
        </Map>
      </div>
    </APIProvider>
  );
}

function PlaceAutoComplete({
  form,
  field,
  setPosition,
  setIsMarkerOn,
}: {
  form: UseFormReturn<FormPlantType, any, undefined>;
  field: ControllerRenderProps<FormPlantType, "address">;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setIsMarkerOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [inputValue, setInputValue] = useState<string | undefined>("");

  const onPlaceChanged = (place: google.maps.places.PlaceResult) => {
    if (place) {
      form.setValue("address", place.formatted_address! || place.name!);
      // setInputValue(place.formatted_address || place.name);
      const coords = place.geometry?.location?.toJSON();
      form.setValue("coordinates", { lat: coords?.lat!, lng: coords?.lng! });
      setIsMarkerOn(true);
      setPosition({ lat: coords?.lat!, lng: coords?.lng! });
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  const autoComplete = useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  // console.log(test?.getPlace());

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  {
    /* <Input
                  placeholder="Plant A"
                  type="text"
                  {...field}
                /> */
  }

  return (
    <Input
      {...field}
      ref={inputRef}
      type="text"
      onBlur={() => {
        if (autoComplete) {
          const value = autoComplete.getPlace()?.formatted_address || "";
          form.setValue("address", value);
        }
      }}
    />
  );
}
