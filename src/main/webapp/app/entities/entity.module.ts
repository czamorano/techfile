import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TechfileAutonomiaModule } from './autonomia/autonomia.module';
import { TechfileProvinciaModule } from './provincia/provincia.module';
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
import { TechfileAutonomiaImsModule } from './autonomia-ims/autonomia-ims.module';
import { TechfileMesImsModule } from './mes-ims/mes-ims.module';
import { TechfileTipoRelacionImsModule } from './tipo-relacion-ims/tipo-relacion-ims.module';
import { TechfilePensionistaImsModule } from './pensionista-ims/pensionista-ims.module';
import { TechfileFicheroImsModule } from './fichero-ims/fichero-ims.module';
import { TechfileFicheroByteImsModule } from './fichero-byte-ims/fichero-byte-ims.module';
import { TechfileDiscapacidadImsModule } from './discapacidad-ims/discapacidad-ims.module';
import { TechfileDiagnosticoImsModule } from './diagnostico-ims/diagnostico-ims.module';
import { TechfileEtiologiaImsModule } from './etiologia-ims/etiologia-ims.module';
import { TechfileUsuarioImsModule } from './usuario-ims/usuario-ims.module';
import { TechfileCierreImsModule } from './cierre-ims/cierre-ims.module';
import { TechfileProcesoImsModule } from './proceso-ims/proceso-ims.module';
import { TechfileErrorRegistroImsModule } from './error-registro-ims/error-registro-ims.module';
import { TechfileTipoErrorImsModule } from './tipo-error-ims/tipo-error-ims.module';
import { TechfilePerceptorImsModule } from './perceptor-ims/perceptor-ims.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TechfileAutonomiaModule,
        TechfileProvinciaModule,
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
        TechfileAutonomiaImsModule,
        TechfileMesImsModule,
        TechfileTipoRelacionImsModule,
        TechfilePensionistaImsModule,
        TechfileFicheroImsModule,
        TechfileFicheroByteImsModule,
        TechfileDiscapacidadImsModule,
        TechfileDiagnosticoImsModule,
        TechfileEtiologiaImsModule,
        TechfileUsuarioImsModule,
        TechfileCierreImsModule,
        TechfileProcesoImsModule,
        TechfileErrorRegistroImsModule,
        TechfileTipoErrorImsModule,
        TechfilePerceptorImsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileEntityModule {}
