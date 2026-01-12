package org.gusqwen.intellij.settings

import com.intellij.openapi.options.Configurable
import com.intellij.ui.components.JBTextField
import com.intellij.util.ui.FormBuilder
import javax.swing.JComponent
import javax.swing.JPanel

class GusQwenSettingsConfigurable : Configurable {
  private var mainPanel: JPanel? = null
  private val nodePathField = JBTextField()

  override fun getDisplayName(): String = "Gus Qwen"

  override fun createComponent(): JComponent {
    val panel = FormBuilder.createFormBuilder()
      .addLabeledComponent("Node path (optional)", nodePathField)
      .panel
    mainPanel = panel
    return panel
  }

  override fun isModified(): Boolean {
    val settings = GusQwenSettingsState.getInstance()
    return nodePathField.text != settings.nodePath
  }

  override fun apply() {
    val settings = GusQwenSettingsState.getInstance()
    settings.nodePath = nodePathField.text.trim()
  }

  override fun reset() {
    val settings = GusQwenSettingsState.getInstance()
    nodePathField.text = settings.nodePath
  }

  override fun disposeUIResources() {
    mainPanel = null
  }
}
