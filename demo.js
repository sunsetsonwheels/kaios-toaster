document.addEventListener('DOMContentLoaded', function () {
  'use strict'

  function switchTheme () {
    const currentSelectedTheme = localStorage.getItem('appTheme')
    if (currentSelectedTheme == null) {
      localStorage.setItem('appTheme', 'light')
    }
    var contentElements = document.querySelectorAll('.content')
    var softkeyBars = document.querySelectorAll('.softkeys-bar')
    var separatorElements = document.querySelectorAll('.separator')
    var settingsElements = document.querySelectorAll('.settings-entry')
    switch (currentSelectedTheme) {
      case 'light':
        for (var contentElement of contentElements) {
          contentElement.classList.remove('theme-content-dark')
          contentElement.classList.add('theme-content-light')
        }
        for (var softkeyBar of softkeyBars) {
          softkeyBar.classList.remove('theme-softkeys-dark')
          softkeyBar.classList.add('theme-softkeys-light')
        }
        for (var separatorsElement of separatorElements) {
          separatorsElement.classList.remove('theme-separator-dark')
          separatorsElement.classList.add('theme-separator-light')
        }
        for (var settingsElement of settingsElements) {
          settingsElement.classList.remove('theme-settings-dark')
          settingsElement.classList.add('theme-settings-light')
          settingsElement.children[1].classList.remove('theme-settings-dark')
          settingsElement.children[1].classList.add('theme-settings-light')
        }
        break
      case 'dark':
        for (var contentElement of contentElements) {
          contentElement.classList.remove('theme-content-light')
          contentElement.classList.add('theme-content-dark')
        }
        for (var softkeyBar of softkeyBars) {
          softkeyBar.classList.remove('theme-softkeys-light')
          softkeyBar.classList.add('theme-softkeys-dark')
        }
        for (var separatorElement of separatorElements) {
          separatorElement.classList.remove('theme-separator-light')
          separatorElement.classList.add('theme-separator-dark')
        }
        for (var settingsElement of settingsElements) {
          settingsElement.classList.remove('theme-settings-light')
          settingsElement.classList.add('theme-settings-dark')
          settingsElement.children[1].classList.remove('theme-settings-light')
          settingsElement.children[1].classList.add('theme-settings-dark')
        }
        break
      default:
        localStorage.setItem('appTheme', 'light')
        switchTheme()
        break
    }
  }

  var settingsElements = {
    toastText: document.getElementById('button-toast-text'),
    toastPosition: document.getElementById('select-toast-position'),
    toastType: document.getElementById('select-toast-type'),
    toastTimeout: document.getElementById('button-toast-timeout'),
    appTheme: document.getElementById('select-app-theme')
  }

  function resetSettings () {
    localStorage.setItem('toastPosition', defaultSettings.toastPosition)
    currentSettings.toastPosition = defaultSettings.toastPosition
    settingsElements.toastPosition.value = currentSettings.toastPosition

    localStorage.setItem('toastType', defaultSettings.toastType)
    currentSettings.toastType = defaultSettings.toastType
    settingsElements.toastType.value = currentSettings.toastType

    localStorage.setItem('toastTimeout', defaultSettings.toastTimeout)
    currentSettings.toastTimeout = defaultSettings.toastTimeout
    settingsElements.toastTimeout.innerText = currentSettings.toastTimeout

    localStorage.setItem('appTheme', defaultSettings.appTheme)
    currentSettings.appTheme = defaultSettings.appTheme
    settingsElements.appTheme.value = currentSettings.appTheme
    switchTheme()
  }

  function spawnNewToast () {
    kaiosToaster({
      message: currentToastText,
      position: currentSettings.toastPosition,
      type: currentSettings.toastType,
      timeout: parseInt(currentSettings.toastTimeout)
    })
  }

  const defaultSettings = {
    toastPosition: 'north',
    toastType: '',
    toastTimeout: '3000',
    appTheme: 'light'
  }
  
  var currentSettings = {
    toastPosition: localStorage.getItem('toastPosition'),
    toastType: localStorage.getItem('toastType'),
    toastTimeout: localStorage.getItem('toastTimeout'),
    appTheme: localStorage.getItem('appTheme')
  }
  // Cheak is any settings key is invalid
  if (currentSettings.toastPosition === null) {
    localStorage.setItem('toastPosition', defaultSettings.toastPosition)
    currentSettings.toastPosition = defaultSettings.toastPosition
  }
  if (currentSettings.toastType === null) {
    localStorage.setItem('toastType', defaultSettings.toastType)
    currentSettings.toastType = defaultSettings.toastType
  }
  if (currentSettings.toastTimeout === null) {
    localStorage.setItem('toastTimeout', defaultSettings.toastTimeout)
    currentSettings.toastTimeout = defaultSettings.toastTimeout
  }
  if (currentSettings.appTheme === null) {
    localStorage.setItem('appTheme', defaultSettings.appTheme)
    currentSettings.appTheme = defaultSettings.appTheme
  }
  settingsElements.toastPosition.value = currentSettings.toastPosition
  settingsElements.toastType.value = currentSettings.toastType
  settingsElements.toastTimeout.innerText = currentSettings.toastTimeout
  settingsElements.appTheme.value = currentSettings.appTheme
  switchTheme()

  var currentToastText = 'Hello!'
  settingsElements.toastText.innerText = currentToastText

  settingsElements.toastText.onclick = function () {
    const inputtedText = prompt('Toast text:')
    if (inputtedText === null || inputtedText === '') {
      currentToastText = 'Hello!'
    } else {
      currentToastText = inputtedText
      settingsElements.toastText.innerText = inputtedText
    }
  }

  settingsElements.toastTimeout.onclick = function () {
    const inputtedText = prompt('Toast timeout:')
    if (inputtedText === null || inputtedText === '') {
      currentToastText = '3000'
    } else {
      localStorage.setItem('toastTimeout', inputtedText)
      currentSettings.toastTimeout = inputtedText
      settingsElements.toastTimeout.innerText = inputtedText
    }
  }

  settingsElements.toastPosition.onchange = function (e) {
    localStorage.setItem('toastPosition', e.target.value)
    currentSettings.toastPosition = e.target.value
  }

  settingsElements.toastType.onchange = function (e) {
    localStorage.setItem('toastType', e.target.value)
    currentSettings.toastType = e.target.value
  }

  settingsElements.appTheme.onchange = function (e) {
    localStorage.setItem('appTheme', e.target.value)
    currentSettings.appTheme = e.target.value
    switchTheme()
  }

  for (var element of document.querySelectorAll('.settings-entry')) {
    element.children[1].onblur = function () {
      naviBoard.getActiveElement().focus()
    }
  }

  naviBoard.setNavigation('settings-content')

  window.onkeydown = function (e) {
    switch (e.key) {
      case 'SoftLeft':
        spawnNewToast()
        break
      case 'Enter':
        naviBoard.getActiveElement().children[1].focus()
        break
      case 'SoftRight':
        resetSettings()
        break
    }
  }
})
