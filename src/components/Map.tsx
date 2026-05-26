export default function Map() {
  return (
    <div id="map" className="w-full h-[400px] sm:h-[500px]">
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=34.100749%2C44.952116&z=17&pt=34.100749%2C44.952116%2Cpm2rdm~34.100749%2C44.952116%2CПМ2РДМ&text=%D0%93%D0%91%D0%9E%D0%A3%20%D0%94%D0%9F%D0%9E%20%D0%A0%D0%9A%20%D0%9A%D0%A0%D0%98%D0%9F%D0%9F%D0%9E%2C%20%D0%A1%D0%B8%D0%BC%D1%84%D0%B5%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%2C%2015"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title="ГБОУ ДПО РК КРИППО на карте"
      />
    </div>
  );
}
