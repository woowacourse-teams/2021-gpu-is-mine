import { useState } from "react";
import cx from "classnames";
import ManagerNavigation from "../../../domains/ManagerNavigation/ManagerNavigation";
import ManagerHeader from "../../../domains/ManagerHeader/ManagerHeader";
import ManagerSubHeader from "../../../domains/ManagerSubHeader/ManagerSubHeader";
import { Container } from "./GpuServerView.styled";

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ac diam at maximus. Donec at lorem a odio imperdiet dignissim. Duis interdum dolor ipsum, eu tempus erat hendrerit eu. Vivamus congue dui ut lorem tempus auctor. Praesent ac ante et arcu gravida pulvinar. Integer enim eros, porttitor et hendrerit nec, commodo sed erat. Suspendisse a augue porttitor, malesuada leo non, ultrices risus. Praesent eget diam pretium, pulvinar est id, cursus enim. Pellentesque vel nulla vel sapien commodo convallis a eget eros.

Duis ultrices eleifend sem, eu imperdiet risus aliquam in. Sed tincidunt ipsum ac nulla tempus, quis lobortis magna posuere. Aenean ut nulla nulla. Morbi posuere, nisl et feugiat sodales, purus nunc tempus quam, ullamcorper venenatis eros ipsum ac sapien. Proin consectetur convallis velit nec tempor. Nunc in cursus ante, eget placerat enim. Nulla malesuada sapien at neque dictum tempus. Aliquam facilisis rhoncus pretium. Sed ut diam sed odio laoreet gravida pulvinar at nunc. Proin a cursus libero, quis rutrum nunc. In condimentum, tortor in tempus suscipit, mi nunc dapibus metus, vel faucibus ipsum odio quis sem. Curabitur finibus dui ut lorem finibus, eget sagittis lorem sodales. Pellentesque tristique interdum odio a venenatis. Aenean aliquet nulla a quam fermentum, id cursus dolor tempus.

Quisque lacinia eros suscipit, egestas dolor vitae, pharetra sapien. Integer at enim eget erat vestibulum aliquet. Etiam nec eros sodales, commodo neque vel, venenatis lacus. Nulla arcu velit, rutrum sit amet laoreet ut, vulputate semper lorem. Mauris vehicula justo magna, sed interdum risus dapibus sed. Aliquam ligula nunc, vehicula egestas ante lacinia, dignissim luctus diam. Donec id finibus urna, ut iaculis mauris. Etiam rutrum massa risus, vel gravida lorem pharetra et. Nunc venenatis quam quis nunc mattis, non sodales justo accumsan. Aenean nec lectus varius, condimentum ipsum quis, lacinia diam. Maecenas mollis ligula odio, aliquet commodo dui cursus ac. Cras tincidunt posuere quam et lacinia. Maecenas ac odio nec sapien eleifend interdum. Suspendisse potenti.

Curabitur at suscipit justo. Donec tincidunt porttitor nibh, ac laoreet ante accumsan non. In eu semper elit. Etiam sed purus ut dui semper cursus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In ex ipsum, rutrum maximus libero eget, cursus dignissim justo. Nulla id ex ligula. Nulla at nisl at mauris eleifend suscipit. Aliquam ac nisi nec nisl rhoncus euismod a nec ligula. Morbi a congue nunc. Nullam neque mauris, pretium eget consectetur non, volutpat in odio. Mauris viverra purus pellentesque arcu accumsan, id placerat justo lobortis. Cras ut est nec dui aliquam consequat eget sit amet est. Phasellus luctus tristique faucibus. Fusce vitae diam ut nunc dignissim hendrerit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique in metus eget gravida. Donec gravida venenatis nisi sit amet consectetur. Etiam vel aliquet orci. Morbi maximus ullamcorper velit, id fermentum sapien dictum vel. Vestibulum congue laoreet ipsum, a pellentesque quam vulputate non. Ut viverra varius ligula et iaculis. Sed luctus tincidunt mauris sit amet tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu ipsum accumsan, egestas leo eget, pharetra leo. In sit amet est a massa posuere mollis. Nulla cursus eget erat ut sollicitudin.

Vestibulum nec tempus dui. Praesent at tristique tortor. Ut convallis dapibus ultricies. Curabitur pharetra justo risus, ut dictum metus pretium ut. Sed sit amet sapien a justo maximus facilisis id non est. Nulla eros ligula, feugiat eget imperdiet ac, lacinia in quam. Sed condimentum nibh at justo ullamcorper feugiat. Maecenas ornare nisl nunc. Vestibulum laoreet massa ac accumsan consequat. Mauris non sem lacinia, fringilla velit sit amet, aliquet magna. Proin pulvinar nulla quis vestibulum faucibus. Morbi ligula ipsum, lacinia id hendrerit sed, bibendum non urna.

Curabitur sollicitudin lectus maximus nisl iaculis scelerisque. Proin dui turpis, fringilla at massa ac, venenatis pulvinar lacus. Proin id accumsan diam, tempus tempor ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam purus arcu, ullamcorper nec fringilla non, faucibus non purus. In hac habitasse platea dictumst. In quis nisl elit. Aliquam vel semper turpis. Suspendisse lobortis odio nunc, id aliquet est volutpat id. Duis et dolor vitae lectus rhoncus placerat eget id turpis. Vivamus at tortor sed tortor suscipit lacinia. Aenean tristique justo mi, sit amet porta nisi iaculis a. Proin eleifend vitae purus eu rutrum. Sed id velit a nisl feugiat consequat non euismod ligula.

Donec imperdiet iaculis elementum. Curabitur ac dolor ex. Suspendisse luctus a quam nec hendrerit. Cras et eros non urna bibendum facilisis. Fusce eu sapien nulla. Proin lectus ante, mollis id neque sed, hendrerit elementum odio. Nam varius dui quis magna aliquam pretium.

Morbi vitae fringilla magna. In id lacinia orci. Vestibulum aliquam mollis nisi, non euismod dolor imperdiet molestie. Proin quis felis mollis, aliquet tellus at, dignissim mauris. Cras leo tortor, volutpat a eleifend eu, vehicula in massa. Cras at venenatis lectus. Morbi malesuada aliquam fringilla. Vestibulum sed diam non ante hendrerit feugiat. Praesent et consectetur ante. Nullam elementum dapibus ligula. In hac habitasse platea dictumst. Quisque ut mattis mauris, ut condimentum ante. Cras placerat, tellus vel pulvinar bibendum, eros orci elementum sem, blandit suscipit lorem nisl vel dui. Duis venenatis vitae felis eget condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Cras id accumsan enim. Integer faucibus nunc non lectus elementum, sit amet tristique diam laoreet. Praesent pretium magna urna. Praesent blandit urna quis tellus gravida porta. Nunc pharetra mauris risus, vitae mollis orci rutrum et. Nulla in eros a nisi ultrices condimentum ut quis erat. Aliquam erat volutpat. Fusce cursus bibendum arcu non convallis. Proin vel laoreet est, sit amet congue turpis. Cras commodo, urna nec interdum elementum, leo sem placerat ligula, a aliquam nulla magna sed ex.

Nullam gravida ornare tincidunt. Vestibulum placerat pretium convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur iaculis ipsum tristique lacus rhoncus maximus. Donec iaculis odio molestie eros lacinia, a ullamcorper quam blandit. Pellentesque tincidunt, erat non placerat faucibus, nisl leo sodales metus, cursus malesuada tortor ligula in nulla. Mauris maximus, ante eu tempus commodo, nibh lacus viverra arcu, id porta enim sapien eget orci. Nulla ornare neque in elit lobortis iaculis. Duis et nisl sed ex rhoncus porttitor ac vel enim. Suspendisse ullamcorper augue et nunc semper interdum non interdum nulla.

Nulla rhoncus nulla ultrices, rutrum odio non, auctor lorem. Cras molestie ex a facilisis ultrices. Vestibulum bibendum urna a lectus suscipit vestibulum. Vestibulum facilisis molestie venenatis. Praesent fermentum sodales eros nec efficitur. Nam venenatis leo vitae nisi consectetur elementum. Morbi tellus urna, gravida eget consectetur non, imperdiet at ex. Duis iaculis tincidunt sapien sit amet hendrerit. Sed aliquam justo quam, non lacinia nibh dapibus ut. Fusce sed volutpat justo. Vivamus rhoncus mauris non erat vestibulum suscipit. Nullam dictum tincidunt tortor in scelerisque. Curabitur vulputate, leo vitae tincidunt volutpat, sapien felis venenatis eros, vel ultrices erat mauris nec nunc. In ornare mattis lectus. Fusce mollis porta tellus cursus molestie.

Fusce et lacus eu ligula ornare mattis. Nullam volutpat lobortis ex id euismod. Etiam vel varius massa, in tincidunt massa. Aenean lectus tellus, bibendum sit amet malesuada eget, dictum quis diam. Curabitur venenatis imperdiet bibendum. Vestibulum egestas tristique neque, sit amet luctus eros varius ac. Duis aliquam eget eros sed accumsan.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc porta augue ut mi tincidunt rhoncus. Donec purus ante, malesuada eu molestie in, mattis a leo. Vestibulum vel arcu nec augue dapibus volutpat in in ipsum. Curabitur efficitur, ex sit amet consequat eleifend, tortor risus viverra dolor, sed imperdiet ante augue ut mauris. Nam velit ex, luctus non nunc eu, dignissim maximus dui. Donec et interdum mauris, id laoreet diam. Duis ultrices tristique justo ac tincidunt. Donec vel maximus enim.

Fusce consequat ante ante, quis porta neque malesuada ut. Mauris faucibus non mi in accumsan. Phasellus vel urna arcu. Nulla iaculis sem orci, sed tincidunt augue consequat sit amet. Nunc metus velit, eleifend in est et, tincidunt lobortis justo. Quisque vel iaculis mauris, accumsan egestas risus. Sed leo sem, lacinia ut ullamcorper a, vestibulum at lectus. In arcu metus, scelerisque non volutpat sit amet, molestie at mi. Quisque interdum quam quis sollicitudin tempus. Vivamus euismod nunc lacus, nec placerat libero fringilla in. In nunc neque, lobortis a condimentum nec, mollis vel lectus. Fusce varius sed libero quis finibus.`;

const GpuServerView = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleClick = () => setIsNavVisible(!isNavVisible);

  const labName = "동동Lab";

  return (
    <Container>
      <div className="header">
        <ManagerHeader labName={labName} />
      </div>
      <div className="sub-header">
        <ManagerSubHeader labName={labName} onClick={handleClick} />
      </div>
      <div className={cx("nav", isNavVisible && "nav--visible")}>
        <ManagerNavigation />
      </div>
      <main className="content">
        <p>{loremIpsum}</p>
      </main>
      <footer className="footer">
        <span>All Rights Reserved gpu-is-mine</span>
      </footer>
    </Container>
  );
};

export default GpuServerView;
