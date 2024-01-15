"use client";

import SideBar from '@/app/components/SideBar'
import AnnotationViewer from '@/app/components/AnnotationViewer'
import WordsList from '@/app/components/WordsList';

export default () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-1 md:col-span-3">
        <SideBar />
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
