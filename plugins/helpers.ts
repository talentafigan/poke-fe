class Helpers {
  intialString(val: any) {
    if (!val) return;
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
    let initials = [...val.matchAll(rgx)] || [];
    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();
    return initials;
  }
  removeDashString(val: string) {
    if (!val) return '';
    return val.replace(/-/g, " ");
  }
  capitalizationFormat(val: string) {
    if (!val) return '';
    return val.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }
}

export default new Helpers();
