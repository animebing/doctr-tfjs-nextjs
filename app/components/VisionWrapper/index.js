"use client";

import SideBar from '@/app/components/SideBar'
import AnnotationViewer from '@/app/components/AnnotationViewer'
import WordsList from '@/app/components/WordsList';
import { DET_CONFIG, RECO_CONFIG } from "@/app/common/constants";

export default () => {
  const [detConfig, setDetConfig] = useState(DET_CONFIG.db_mobilenet_v2);
  const [recoConfig, setRecoConfig] = useState(RECO_CONFIG.crnn_vgg16_bn);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-1 md:col-span-3">
      <Sidebar
        detConfig={detConfig}
        setDetConfig={setDetConfig}
        recoConfig={recoConfig}
        setRecoConfig={setRecoConfig}
      />
      </div>
      <div className="col-span-1 md:col-span-5">
        <AnnotationViewer />
      </div>
      <div className="col-span-1 md:col-span-4">
        <WordsList />
      </div>
  </div>
  );
  
};
