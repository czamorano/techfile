import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TechfileAutonomiaModule } from './autonomia/autonomia.module';
import { TechfileProvinciaModule } from './provincia/provincia.module';
import { TechfileFicheroByteMySuffixModule } from './fichero-byte-my-suffix/fichero-byte-my-suffix.module';
import { TechfileProvinciaMySuffixModule } from './provincia-my-suffix/provincia-my-suffix.module';
import { TechfileMesMySuffixModule } from './mes-my-suffix/mes-my-suffix.module';
import { TechfilePensionConcurrenteMySuffixModule } from './pension-concurrente-my-suffix/pension-concurrente-my-suffix.module';
import { TechfileTipoRelacionMySuffixModule } from './tipo-relacion-my-suffix/tipo-relacion-my-suffix.module';
import { TechfileRegimenProcedenciaMySuffixModule } from './regimen-procedencia-my-suffix/regimen-procedencia-my-suffix.module';
import { TechfilePersonaMySuffixModule } from './persona-my-suffix/persona-my-suffix.module';
import { TechfilePensionistaMySuffixModule } from './pensionista-my-suffix/pensionista-my-suffix.module';
import { TechfileConvivienteMySuffixModule } from './conviviente-my-suffix/conviviente-my-suffix.module';
import { TechfilePerceptorMySuffixModule } from './perceptor-my-suffix/perceptor-my-suffix.module';
import { TechfileFicheroMySuffixModule } from './fichero-my-suffix/fichero-my-suffix.module';
import { TechfileDiscapacidadMySuffixModule } from './discapacidad-my-suffix/discapacidad-my-suffix.module';
import { TechfileDiagnosticoMySuffixModule } from './diagnostico-my-suffix/diagnostico-my-suffix.module';
import { TechfileEtiologiaMySuffixModule } from './etiologia-my-suffix/etiologia-my-suffix.module';
import { TechfileUsuarioMySuffixModule } from './usuario-my-suffix/usuario-my-suffix.module';
import { TechfileMesModule } from './mes/mes.module';
import { TechfilePensionConcurrenteModule } from './pension-concurrente/pension-concurrente.module';
import { TechfileTipoRelacionModule } from './tipo-relacion/tipo-relacion.module';
import { TechfileRegimenProcedenciaModule } from './regimen-procedencia/regimen-procedencia.module';
import { TechfilePersonaModule } from './persona/persona.module';
import { TechfilePensionistaModule } from './pensionista/pensionista.module';
import { TechfileConvivienteModule } from './conviviente/conviviente.module';
import { TechfilePerceptorModule } from './perceptor/perceptor.module';
import { TechfileFicheroModule } from './fichero/fichero.module';
import { TechfileFicheroByteModule } from './fichero-byte/fichero-byte.module';
import { TechfileDiscapacidadModule } from './discapacidad/discapacidad.module';
import { TechfileDiagnosticoModule } from './diagnostico/diagnostico.module';
import { TechfileEtiologiaModule } from './etiologia/etiologia.module';
import { TechfileUsuarioModule } from './usuario/usuario.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TechfileAutonomiaModule,
        TechfileProvinciaModule,
        TechfileFicheroByteMySuffixModule,
        TechfileProvinciaMySuffixModule,
        TechfileMesMySuffixModule,
        TechfilePensionConcurrenteMySuffixModule,
        TechfileTipoRelacionMySuffixModule,
        TechfileRegimenProcedenciaMySuffixModule,
        TechfilePersonaMySuffixModule,
        TechfilePensionistaMySuffixModule,
        TechfileConvivienteMySuffixModule,
        TechfilePerceptorMySuffixModule,
        TechfileFicheroMySuffixModule,
        TechfileDiscapacidadMySuffixModule,
        TechfileDiagnosticoMySuffixModule,
        TechfileEtiologiaMySuffixModule,
        TechfileUsuarioMySuffixModule,
        TechfileMesModule,
        TechfilePensionConcurrenteModule,
        TechfileTipoRelacionModule,
        TechfileRegimenProcedenciaModule,
        TechfilePersonaModule,
        TechfilePensionistaModule,
        TechfileConvivienteModule,
        TechfilePerceptorModule,
        TechfileFicheroModule,
        TechfileFicheroByteModule,
        TechfileDiscapacidadModule,
        TechfileDiagnosticoModule,
        TechfileEtiologiaModule,
        TechfileUsuarioModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileEntityModule {}
