import { Historicosolicitacao } from './historicosolicitacao';
import { Solicitacao } from './solicitacao';

describe('Solicitacao', () => {
  it('should create an instance', () => {
    expect(new Solicitacao('','','','','','','',0,'','','','','', [new Historicosolicitacao('','','','')],'','','','','')).toBeTruthy();
  });
});
