export class Meta {
  get(name: string): string {
    return (document.querySelector(`meta[name=${name}]`) as HTMLMetaElement)?.content;
  }
}
