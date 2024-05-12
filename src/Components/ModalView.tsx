// @ts-nocheck
import { PerspectiveCamera, View } from "@react-three/drei";
import { AmbientLight } from "three";
import Lights from "./Lights";
import { Suspense } from "react";
import IphoneModel from "./Iphone";

const ModalView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2 border-red-500 w-full h-full ${
        index === 2 ? "right-[-100%]" : ""
      }`}
    >
      {/* <ambientLight intensity={0.3} /> */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      {/* <Suspense fallback={<div>Loading</div>}> */}
      <IphoneModel />
      {/* </Suspense> */}
    </View>
  );
};

export default ModalView;
